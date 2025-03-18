import React from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle } from 'lucide-react';
import { cn } from "@/lib/utils";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 text-gray-700",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-gray-900">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
});
ListItem.displayName = "ListItem";

export default function NavigationMenuCustomUi() {
  const isLoggedIn = false;

  return (
    <div className="bg-white text-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <NavigationMenu className="text-gray-900">
            <NavigationMenuList className="py-4">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100 text-gray-900">Buy</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white border border-gray-200 shadow-lg">
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-600 to-blue-700 p-6 no-underline outline-none focus:shadow-md">
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            Find Your Dream Home
                          </div>
                          <p className="text-sm leading-tight text-gray-200">
                            Explore available properties that match your criteria
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem title="Houses" href="/properties/houses">
                      Browse through available houses
                    </ListItem>
                    <ListItem title="Apartments" href="/properties/apartments">
                      Find the perfect apartment
                    </ListItem>
                    <ListItem title="New Construction" href="/properties/new">
                      Explore newly built properties
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
  
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100 text-gray-900">Rent</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white border border-gray-200 shadow-lg">
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    <ListItem title="Residential Rentals" href="/rentals/residential">
                      Houses and apartments for rent
                    </ListItem>
                    <ListItem title="Commercial Spaces" href="/rentals/commercial">
                      Office and retail spaces
                    </ListItem>
                    <ListItem title="Short-term Rentals" href="/rentals/short-term">
                      Vacation and temporary stays
                    </ListItem>
                    <ListItem title="Find Roommates" href="/rentals/roommates">
                      Share accommodations
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
  
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100 text-gray-900">Sell</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white border border-gray-200 shadow-lg">
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    <ListItem title="List Your Property" href="/sell/list">
                      Post your property for sale
                    </ListItem>
                    <ListItem title="Property Valuation" href="/sell/valuation">
                      Get an estimate for your property
                    </ListItem>
                    <ListItem title="Selling Guide" href="/sell/guide">
                      Learn about the selling process
                    </ListItem>
                    <ListItem title="Find an Agent" href="/sell/agents">
                      Connect with real estate agents
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
  
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100 text-gray-900">Resources</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white border border-gray-200 shadow-lg">
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    <ListItem title="Mortgage Calculator" href="/resources/mortgage-calculator">
                      Calculate your monthly payments
                    </ListItem>
                    <ListItem title="Market Trends" href="/resources/market-trends">
                      Real estate market analysis
                    </ListItem>
                    <ListItem title="Buying Guide" href="/resources/buying-guide">
                      Tips for first-time buyers
                    </ListItem>
                    <ListItem title="Help Center" href="/resources/help">
                      FAQs and support
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
  
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Button variant="ghost" className="text-gray-900 hover:bg-gray-100">
                  Sign In
                </Button>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Register
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>
                      <UserCircle className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg text-gray-900">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>My Properties</DropdownMenuItem>
                  <DropdownMenuItem>Saved Listings</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}