import { useState, useContext, useEffect } from "react";
import * as React from "react";
import { CaretSortIcon, CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { database } from "../../services/firebase";
import { ref, push, onValue } from "firebase/database";
import { UserContext } from '@/providers/UserProvider';
import { useUrl } from '@/components/main/UrlContext';
import { DialogClose } from "@radix-ui/react-dialog";

const initialGroups = [
  {
    label: "Servers",
    teams: []
  }
];

type Team = (typeof initialGroups)[number]["teams"][number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [servername, setServername] = useState("");
  const [newserverUrl, setnewServerUrl] = useState("");
  const [groups, setGroups] = useState(initialGroups);
  const { user } = useContext(UserContext);
  
  const { url, setUrl } = useUrl();
  const [recordAdded, setRecordAdded] = useState(false);

  useEffect(() => {
    if (!user) return;

    const urlll = `servers/${user.uid}`;
    const dbRef = ref(database, urlll);

    // Fetch the data from the database when the component mounts
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data: { [key: string]: { name: string; url: string } } = snapshot.val();
      if (data) {
        const teams = Object.entries(data).map(([key, value]: [string, { name: string; url: string }]) => ({
          label: value.name,
          value: key,
          url: value.url
        }));
        setGroups([{ label: "Servers", teams }]);
        if (!selectedTeam) {
          setSelectedTeam(teams[0]);
        }
        // If there are teams, set recordAdded state to true
        if (teams.length > 0) {
          setRecordAdded(true);
        }
      } else {
        // If no data is fetched, show the "Add Server" popup
        setShowNewTeamDialog(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, selectedTeam]);

  const handleCancelClick = () => {
    // Close the dialog only if a record has been added
    if (recordAdded) {
      setShowNewTeamDialog(false);
    }
  };

  useEffect(() => {
    console.log("Selected Server:", selectedTeam);
    // Check if a team is selected
    if (selectedTeam) {
      // Set the URL context with the URL of the selected team
      console.log("Setting URL in context:", selectedTeam.url);
      setUrl(selectedTeam.url);
    }
  }, [selectedTeam, setUrl]);

  const addServerToDatabase = async (url) => {
    try {
      const urlll = `servers/${user.uid}`;
      const dbRef = ref(database, urlll);
      await push(dbRef, {
        name: servername,
        url
      });
  
      setnewServerUrl("");
      setServername("");
  
      alert("Server added successfully!");
    } catch (error) {
      console.error("Error adding server:", error);
      alert("An error occurred while adding the server.");
    }
  };
  
  const isValidUrl = (url) => {
    const pattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return pattern.test(url);
  };

  const ensureTrailingSlash = (url) => {
    return url.endsWith("/") ? url : url + "/";
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!user) {
      alert("You must be signed in to add a server.");
      return;
    }
  
    // Check if the server URL is provided
    if (!newserverUrl) {
      alert("Please provide a server URL.");
      return;
    }
  
    // Validate the format of the server URL
    if (!isValidUrl(newserverUrl)) {
      alert("Invalid server URL format. Please enter a valid URL.");
      return;
    }

    // Ensure the URL has a trailing slash
    const serverUrlWithSlash = ensureTrailingSlash(newserverUrl);
  
    try {
      // Ping the server URL to check if it responds with the expected JSON
      const response = await fetch(serverUrlWithSlash);
      const responseData = await response.json();
  
      if (response.ok && responseData.Server === "Server is running") {
        // Server is up and responds correctly, proceed with adding it to the database
        await addServerToDatabase(serverUrlWithSlash);
      } else {
        // Server is down or does not respond with the expected JSON
        alert("Failed to validate the server. Please check the URL and try again.");
      }
    } catch (error) {
      console.error("Error adding server:", error);
      alert("An error occurred while adding the server.");
    }
  };
  
  return (
    <div className="">

      <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>

        <Popover open={open} onOpenChange={setOpen} > 
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-label="Select a Server"
              className={cn("w-[200px] justify-between bg-primary", className)}
            >

              {selectedTeam ? selectedTeam.label : "Select a server"}
              <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" >
            <Command>
              <CommandList>
                <CommandInput placeholder="Search Servers..." />
                <CommandEmpty>No Server found.</CommandEmpty>
                {groups.map((group) => (
                  <CommandGroup key={group.label} heading={group.label}>
                    {group.teams.map((team) => (
                      <CommandItem
                        key={team.value}
                        onSelect={() => {
                          setSelectedTeam(team)
                          setOpen(false)
                        }}
                        className="text-sm"
                      >
                        {/* <Avatar className="mr-2 h-5 w-5">
                          <AvatarImage
                            src={`https://avatar.vercel.sh/${team.value}.png`}
                            alt={team.label}
                            className="grayscale"
                          />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar> */}
                        {team.label}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            selectedTeam && selectedTeam.value === team.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
              <CommandSeparator />
              <CommandList>
                <CommandGroup>
                  <DialogTrigger asChild>
                    <CommandItem
                      onSelect={() => {
                        setOpen(false)
                        setShowNewTeamDialog(true)
                        console.log("Add new server clicked")
                      }}
                    >
                      <PlusCircledIcon className="mr-2 h-5 w-5" />
                      Add New Server
                    </CommandItem>
                  </DialogTrigger>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Server</DialogTitle>
            <DialogDescription>
              Add a new Server.
            </DialogDescription>
          </DialogHeader>
          <div>
            <DialogClose className="absolute top-12 right-2 " />
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="name">Server name</Label>
                <Input id="name" placeholder="My Home Server" value={servername}
                  onChange={(e) => setServername(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plan">Server URL</Label>
                <Input id="plan" placeholder="https://IP:PORT" value={newserverUrl}
                  onChange={(e) => setnewServerUrl(e.target.value)} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelClick}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSubmit}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
