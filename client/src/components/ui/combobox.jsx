import * as React from 'react';
import {
  CaretSortIcon,
  CheckIcon,
  Cross2Icon, // Import the icon for the clear button
} from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function Combobox({
  data,
  placeholder,
  value,
  setValue,
}) {
  const [open, setOpen] = React.useState(false);

  // Function to clear the input value
  const clearValue = () => {
    setValue(''); // Clear the selected value
    setOpen(false); // Close the dropdown
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[400px] justify-between"
        >
          {value
            ? data.find((item) => item.value === value)
                ?.label
            : `Select a ${placeholder}`}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] block p-0">
        <Command>
          <CommandInput
            placeholder={`Search a ${placeholder}`}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>
              No {placeholder} found.
            </CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(
                      currentValue === value
                        ? ''
                        : currentValue,
                    );
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  {item.label}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === item.value
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        {/* Clear Button */}
        <div className="flex justify-end p-2">
          <Button variant="outline" onClick={clearValue}>
            <Cross2Icon className="mr-2 h-4 w-4" />{' '}
            {/* Clear icon */}
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
