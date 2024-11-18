"use client";

import { BookCopy, Home, Landmark, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { MenuPessoaSidebar } from "./MenuPessoa.Sidebar.Dashboard";
import { useSidebarContext } from "@/contexts/sidebar-context";
import { usePessoaContext } from "@/contexts/pessoa-context";
export function SidebarDashboard() {
  const { selectedButton, setSelectedButton } = useSidebarContext();

  const { pessoa } = usePessoaContext();

  let items = [
    {
      title: "Home",
      icon: Home,
    },
    {
      title: "Disciplinas",
      icon: BookCopy,
    },
    {
      title: "Financeiro",
      icon: Landmark,
    },
  ];

  if (pessoa?.tipo === "professor") {
    items = [
      {
        title: "Home",
        icon: Home,
      },
      {
        title: "Disciplinas",
        icon: BookCopy,
      },
    ];
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <SidebarTrigger />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Freire App</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={selectedButton == item.title ? true : false}
                  >
                    <button onClick={() => setSelectedButton(item.title)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <MenuPessoaSidebar
          user={{
            role: pessoa?.tipo || "",
            name: pessoa?.nome || "",
            avatar: "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
