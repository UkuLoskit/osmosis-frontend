import Image from "next/image";
import React, { FunctionComponent, useCallback } from "react";
import { useBooleanWithWindowEvent } from "../../../hooks";
import { MenuDropdown, MenuOption } from "../../control";
import { BaseCell } from "..";
import { PoolCompositionCell } from "./pool-composition";

export interface PoolQuickActionCell
  extends BaseCell,
    Pick<PoolCompositionCell, "poolId"> {
  onAddLiquidity: () => void;
  onRemoveLiquidity: () => void;
  onLockTokens: () => void;
}

/** Displays pool composition as a cell in a table.
 *
 *  Accepts the base hover flag.
 */
export const PoolQuickActionCell: FunctionComponent<
  Partial<PoolQuickActionCell>
> = ({ poolId, onAddLiquidity, onRemoveLiquidity, onLockTokens }) => {
  const [dropdownOpen, setDropdownOpen] = useBooleanWithWindowEvent(false);

  const menuOptions: MenuOption[] = [
    {
      id: "add-liquidity",
      display: "Add liquidity",
    },
    {
      id: "remove-liquidity",
      display: "Remove liquidity",
    },
    { id: "lock-tokens", display: "Lock Tokens" },
  ];

  const doAction = useCallback(
    (optionId) => {
      switch (optionId) {
        case "add-liquidity":
          onAddLiquidity?.();
          break;
        case "remove-liquidity":
          onRemoveLiquidity?.();
          break;
        case "lock-tokens":
          onLockTokens?.();
          break;
      }

      setDropdownOpen(false);
    },
    [poolId, onAddLiquidity, onRemoveLiquidity, onLockTokens]
  );

  return (
    <div
      className="flex items-center"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <button
        className="absolute hover:pointer-cursor"
        onClick={(e) => {
          setDropdownOpen(true);
          e.preventDefault();
        }}
      >
        <Image alt="menu" src="/icons/more-menu.svg" width={24} height={24} />
        <MenuDropdown
          className="w-40 top-0 right-0"
          isOpen={dropdownOpen}
          options={menuOptions}
          onSelect={(id) => doAction(id)}
          isFloating
        />
      </button>
    </div>
  );
};
