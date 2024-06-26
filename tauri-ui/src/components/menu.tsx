"use client"

import { useCallback, useEffect, useState } from "react"
import { Globe, Mic, Router } from "lucide-react"
import { WindowTitlebar } from "tauri-controls"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

import { AboutDialog } from "./about-dialog"
import { MenuModeToggle } from "./menu-mode-toggle"
import { Dialog, DialogTrigger } from "./ui/dialog"
import logo from "../../src-tauri/icons/128x128.png"
export function Menu() {
  const closeWindow = useCallback(async () => {
    const { appWindow } = await import("@tauri-apps/plugin-window")

    appWindow.close()
  }, [])

  return (
    <WindowTitlebar
    // controlsOrder="platform"
    // windowControlsProps={{ platform: "macos", className: "" }}
    >
      <Menubar className="rounded-none border-b border-none pl-2 lg:pl-3">
        <MenubarMenu>
          <div className="inline-flex h-fit w-fit items-center  rounded-full">
            <img src={logo} className="h-8 w-8" alt="Logo" />
          </div>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="font-bold">WhatsMyServerDoing ?</MenubarTrigger>
          <Dialog modal={false}>
            <MenubarContent>
              <DialogTrigger asChild>
                <MenubarItem>About App</MenubarItem>
              </DialogTrigger>
              <MenubarSeparator />
              <MenubarShortcut />
              <MenubarItem onClick={closeWindow}>
                Quit <MenubarShortcut>⌘Q</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
            <AboutDialog />
          </Dialog>
        </MenubarMenu>
        <MenuModeToggle />
      </Menubar>
    </WindowTitlebar>
  )
}
