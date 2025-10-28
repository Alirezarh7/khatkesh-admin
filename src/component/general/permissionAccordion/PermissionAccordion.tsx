// PermissionAccordion.tsx
import React, { useEffect, useState } from "react";
import type { PermissionGroup, SelectedState } from "../../../types/generalType.ts";

type Props = {
  data: PermissionGroup[];
  selected: SelectedState;
  onChange: (next: SelectedState) => void;
  className?: string;
};

const PermissionAccordion: React.FC<Props> = ({ data, selected, onChange, className }) => {
  const [openGroups, setOpenGroups] = useState<Set<number>>(new Set());

  // گروه‌هایی که انتخاب دارن، همیشه باز بمونن
  useEffect(() => {
    const next = new Set<number>(openGroups);
    data.forEach((g) => {
      const hasAny = (selected[g.id]?.length ?? 0) > 0;
      if (hasAny) next.add(g.id);
    });
    setOpenGroups(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, data]);

  const toggleOpen = (groupId: number) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      return next;
    });
  };

  const setGroupSelected = (groupId: number, ids: number[]) => {
    const next: SelectedState = { ...selected, [groupId]: ids };
    if (ids.length === 0) delete next[groupId];
    onChange(next);
  };

  const toggleItem = (groupId: number, itemId: number, checked: boolean) => {
    const current = new Set(selected[groupId] ?? []);
    if (checked) {
      current.add(itemId);
    } else {
      current.delete(itemId);
    }
    setGroupSelected(groupId, Array.from(current));
  };

  const toggleSelectAll = (group: PermissionGroup, checked: boolean) => {
    const allIds = group.value.map((v) => v.id);
    setGroupSelected(group.id, checked ? allIds : []);
  };

  return (
    <div
      className={`w-full rounded-xl border border-gray-200 bg-white p-2 md:p-3 space-y-3 ${className ?? ""}`}
      dir="rtl"
    >
      {data.map((group) => {
        const selectedIds = new Set(selected[group.id] ?? []);
        const countAll = group.value.length;
        const countSelected = selectedIds.size;

        const allChecked = countSelected === countAll && countAll > 0;
        const someChecked = countSelected > 0 && countSelected < countAll;

        const isOpen = openGroups.has(group.id);

        return (
          <div key={group.id} className="border border-dashed rounded-lg">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-3 py-2">
              <div className="flex items-center gap-2">
                <input
                  ref={(el) => {
                    if (el) el.indeterminate = someChecked && !allChecked;
                  }}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={allChecked}
                  onChange={(e) => toggleSelectAll(group, e.target.checked)}
                />
                <button
                  type="button"
                  onClick={() => toggleOpen(group.id)}
                  className="text-right font-medium text-gray-800 hover:text-gray-900"
                >
                  {group.title}
                </button>
              </div>

              <button
                type="button"
                onClick={() => toggleOpen(group.id)}
                className="text-gray-500 hover:text-gray-700 text-sm"
                aria-expanded={isOpen}
                aria-controls={`grp-${group.id}`}
              >
                {isOpen ? "▴" : "▾"}
              </button>
            </div>

            {/* Body */}
            {isOpen && (
              <div id={`grp-${group.id}`} className="px-3 pb-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {group.value.map((item) => {
                    const checked = selectedIds.has(item.id);
                    return (
                      <label
                        key={item.id}
                        className="flex items-center justify-between gap-2 rounded-md border border-gray-200 px-3 py-2 hover:bg-gray-50"
                      >
                        <span className="text-sm text-gray-800">{item.permision}</span>
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300"
                          checked={checked}
                          onChange={(e) => toggleItem(group.id, item.id, e.target.checked)}
                        />
                      </label>
                    );
                  })}
                </div>

                <div className="mt-2 text-xs text-gray-500">
                  {countSelected} از {countAll} انتخاب شده
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PermissionAccordion;
