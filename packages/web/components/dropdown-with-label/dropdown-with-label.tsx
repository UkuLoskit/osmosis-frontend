import { Listbox, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment } from "react";

import { Icon } from "~/components/assets";
import { ListOption } from "~/components/earn/table/types/filters";

interface DropdownWithLabelProps<T> {
  label: string;
  options: ListOption<T>[];
  value: ListOption<T>[];
  onChange: (v: ListOption<T>) => void;
  allLabel?: string;
  buttonClassName?: string;
}

export const DropdownWithLabel = <T,>({
  label,
  onChange,
  value,
  options,
  buttonClassName,
  allLabel,
}: DropdownWithLabelProps<T>) => {
  return (
    <div className="flex items-center gap-7">
      <span className="whitespace-nowrap font-subtitle1 font-bold 2xl:hidden">
        {label}
      </span>
      <Listbox value={options} onChange={() => {}} multiple>
        <div className="relative flex w-full">
          <Listbox.Button
            className={classNames(
              "inline-flex min-w-dropdown-with-label items-center justify-between rounded-lg border-2 border-wosmongton-100 border-opacity-20 bg-osmoverse-900 py-3 px-5 xl:min-w-0",
              buttonClassName
            )}
          >
            <span className="max-w-[100px] truncate font-subtitle1 leading-6 sm:max-w-none">
              {value && value.length === 0 && allLabel}
              {value && value.map(({ label }) => label).join(", ")}
            </span>
            <Icon id="caret-down" />
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition ease-in duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={
                "absolute inset-x-0 z-[51] mt-13 flex flex-col gap-2 rounded-lg bg-osmoverse-800 py-4"
              }
            >
              {options.map((option) => (
                <Listbox.Option
                  className={({ active }) =>
                    classNames(
                      "relative cursor-default select-none py-2 pl-10 pr-4",
                      {
                        "bg-osmoverse-825": active,
                      }
                    )
                  }
                  onClick={() => onChange(option)}
                  key={option.value as unknown as string}
                  value={option.value}
                >
                  <span className="block truncate capitalize">
                    {option.label}
                  </span>
                  {value.findIndex((value) => value.value === option.value) !==
                  -1 ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Icon id="check-mark" className="h-4 w-4" />
                    </span>
                  ) : null}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
