import { useState, useContext, useEffect } from "react"
import * as React from "react"
import { CaretSortIcon, CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { database } from "../../services/firebase";
import { ref, push, onValue } from "firebase/database"; 
import { UserContext } from '@/providers/UserProvider';

const initialGroups = [
  {
    label: "Servers",
    teams: []
  }
]

type Team = (typeof initialGroups)[number]["teams"][number]

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
  const [open, setOpen] = useState(false)
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [servername, setServername] = useState("");
  const [newserverUrl, setnewServerUrl] = useState("");
  const [groups, setGroups] = useState(initialGroups);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) return;

    const urlll = `servers/${user.uid}`;
    const dbRef = ref(database, urlll);

    // Fetch the data from the database when the component mounts
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the data object into an array of teams
        const teams = Object.entries(data).map(([key, value]) => ({
          label: value.name,
          value: key
        }));
        // Update the groups with the fetched teams
        setGroups([{ label: "Servers", teams }]);
        // Select the first team by default if none selected
        if (!selectedTeam) {
          setSelectedTeam(teams[0]);
        }
      }
    });

    // Cleanup function to unsubscribe from database changes
    return () => {
      unsubscribe();
    };
  }, [user]);

  const addServerToDatabase = async () => {
    try {
      const urlll = `servers/${user.uid}`;
      const dbRef = ref(database, urlll);
      await push(dbRef, {
        name: servername,
        url: newserverUrl
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
  
    try {
      // Ping the server URL to check if it's up
      const response = await fetch(newserverUrl);
      console.log(response);
      // Check if the response status is in the success range
      if (response.ok) {
        // Server is up, proceed with adding it to the database
        await addServerToDatabase();
      } else {
        // Server is down or unreachable
        alert("Failed to ping the server. Please check the URL and try again.");
      }
    } catch (error) {
      console.error("Error adding server:", error);
      alert("An error occurred while adding the server.");
    }
  };
  
  return (
    <div>
      <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-label="Select a Server"
              className={cn("w-[200px] justify-between", className)}
            >

              {selectedTeam ? selectedTeam.label : "Select a team"}
              <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
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
            <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSubmit}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
