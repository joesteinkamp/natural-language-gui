"use client"

import * as React from "react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"



import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Checkbox } from "@/components/ui/checkbox"

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import { FontBoldIcon, FontItalicIcon, UnderlineIcon } from "@radix-ui/react-icons"

export type RegistryEntry = {
  component: React.ElementType
  props?: Record<string, any>
  children?: React.ReactNode
}

export const componentRegistry: Record<string, RegistryEntry> = {
  "Accordion": {
    component: (props: any) => (
      <Accordion type="single" collapsible className="w-full" {...props}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>Yes. It comes with default styles that matches the other components.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>Yes's animated by default, but you can disable it if you prefer.</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  },



  "Avatar": {
    component: (props: any) => (
      <Avatar {...props}>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    )
  },
  "Badge": {
    component: Badge,
    children: "Badge"
  },
  "Button": {
    component: Button,
    props: { "nli-markdown": "Start" },
    children: "Start"
  },
  "ButtonGroup": {
    component: ButtonGroup,
    props: {
      label: "My Buttons",
      orientation: "horizontal"
    },
    children: [
            <Button key="1" nli-markdown="*{label}:* {value}">Action 1</Button>,
            <Button key="2" nli-markdown="*{label}:* {value}">Action 2</Button>
    ]
  },
  "Card": {
    component: (props: any) => (
      <Card className="w-[350px]" {...props}>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Your Project Content Here</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    )
  },
  "Carousel": {
    component: (props: any) => (
      <Carousel className="w-full max-w-xs" {...props}>
        <CarouselContent>
          <CarouselItem><div className="p-1"><Card><CardContent className="flex aspect-square items-center justify-center p-6"><span className="text-4xl font-semibold">1</span></CardContent></Card></div></CarouselItem>
          <CarouselItem><div className="p-1"><Card><CardContent className="flex aspect-square items-center justify-center p-6"><span className="text-4xl font-semibold">2</span></CardContent></Card></div></CarouselItem>
          <CarouselItem><div className="p-1"><Card><CardContent className="flex aspect-square items-center justify-center p-6"><span className="text-4xl font-semibold">3</span></CardContent></Card></div></CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  },
  "Checkbox": {
    component: ({ label, ...props }: any) => (
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" {...props} />
        <Label htmlFor="terms">{label}</Label>
      </div>
    ),
    props: {
      "nli-markdown": "Accept terms and conditions",
      label: "Accept terms and conditions"
    }
  },

  "Command": {
    component: (props: any) => (
      <Command className="rounded-lg border shadow-md" {...props}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )
  },

  "Dialog": {
    component: (props: any) => (
      <Dialog {...props}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes to your profile here.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  },
  "Drawer": {
    component: (props: any) => (
      <Drawer {...props}>
        <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  },
  "DropdownMenu": {
    component: (props: any) => (
      <DropdownMenu {...props}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },

  "Input": {
    component: (props: any) => (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">{props['nli-markdown'] || "Project Goal"}</Label>
        <Input type="text" id="email" placeholder="Pitch a new deal" {...props} />
      </div>
    ),
    props: {
        "nli-markdown": "Project Goal",
        defaultValue: "Pitch a new deal"
    }
  },
  "Label": {
    component: Label,
    children: "This is a label"
  },
  "Menubar": {
    component: (props: any) => (
      <Menubar {...props}>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New Tab</MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarItem>Share</MenubarItem>
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
  },

  "Pagination": {
    component: (props: any) => (
      <Pagination {...props}>
        <PaginationContent>
          <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
          <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
          <PaginationItem><PaginationNext href="#" /></PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  },
  "Popover": {
    component: (props: any) => (
      <Popover {...props}>
        <PopoverTrigger asChild><Button variant="outline">Open Popover</Button></PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Dimensions</h4>
              <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  },
  "Progress": {
    component: Progress,
    props: { value: 33 }
  },
  "RadioGroup": {
    component: (props: any) => (
      <div className="grid gap-2">
        <Label>{props.label}</Label>
        <RadioGroup defaultValue="option-one" {...props}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" nli-markdown={`*{${props.label}}:* Option One`} />
            <Label htmlFor="option-one">Option One</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" nli-markdown={`*{${props.label}}:* Option Two`} />
            <Label htmlFor="option-two">Option Two</Label>
          </div>
        </RadioGroup>
      </div>
    ),
    props: {
      label: "Options"
    }
  },

  "Select": {
    component: (props: any) => (
      <Select {...props}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    )
  },

  "Sheet": {
    component: (props: any) => (
      <Sheet {...props}>
        <SheetTrigger asChild><Button variant="outline">Open Sheet</Button></SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>Make changes to your profile here.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    )
  },

  "Slider": {
    component: Slider,
    props: {
      defaultValue: [50],
      max: 100,
      step: 1,
      className: "w-[60%]"
    }
  },
  "Switch": {
    component: (props: any) => (
        <div className="flex items-center space-x-2" {...props}>
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
    )
  },
  "Table": {
    component: (props: any) => (
      <Table {...props}>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  },
  "Tabs": {
    component: (props: any) => (
      <Tabs defaultValue="account" className="w-[400px]" {...props}>
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    )
  },
  "Textarea": {
    component: Textarea,
    props: {
      placeholder: "Type your message here."
    }
  },
  "Toggle": {
    component: (props: any) => (
        <Toggle aria-label="Toggle italic" {...props}>
            <FontItalicIcon className="h-4 w-4" />
        </Toggle>
    )
  },
  "ToggleGroup": {
    component: (props: any) => (
     <ToggleGroup type="multiple" {...props}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <FontBoldIcon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <FontItalicIcon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <UnderlineIcon className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
    )
  },

}
