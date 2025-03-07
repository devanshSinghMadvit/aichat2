"use client";

import { useState, useEffect } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown, CheckCircle } from "lucide-react";
import { signOut } from "next-auth/react";

type DriveItem = {
  id: string;
  name: string;
  mimeType: string;
  children?: DriveItem[];
};

export default function FileTree() {
  const [items, setItems] = useState<DriveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DriveItem | null>(null);

  useEffect(() => {
    fetchDriveContents();
  }, []);

  async function fetchDriveContents() {
    try {
      const response = await fetch("/api/drive");
      const data = await response.json();
      setItems(data);
      setSelectedItem(data[0] || null);
    } catch (error) {
      console.error("Error fetching drive contents:", error);
    } finally {
      setLoading(false);
    }
  }

  const renderDropdownItem = (item: DriveItem, depth: number = 0) => {
    const isFolder = item.mimeType === "application/vnd.google-apps.folder";
    const isSelected = selectedItem?.id === item.id;

    return (
      <div key={item.id}>
        <DropdownMenu.Item
          onSelect={() => {
            setSelectedItem(item);
            setOpen(false);
          }}
          className={`flex flex-row justify-between items-center gap-4 px-2 py-1.5 cursor-pointer hover:bg-gray-800 hover:text-gray-100 ${
            isSelected ? "bg-gray-800 text-gray-100" : "text-gray-300"
          } pl-${depth * 4}`} // Dynamic padding-left based on depth
        >
          <div className="flex flex-row gap-2 items-center">
            <span>{isFolder ? "📁" : "📄"}</span>
            <span>{item.name}</span>
          </div>
          {isSelected && <CheckCircle className="h-4 w-4 text-gray-100" />}
        </DropdownMenu.Item>

        {/* Render children (files or subfolders) recursively */}
        {isFolder && item.children && item.children.length > 0 && (
          <div>
            {item.children.map((child) => renderDropdownItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  if (loading) return <div className="text-gray-500">Loading...</div>;

  return (
    <>
      {items.length > 0 ? (
        <DropdownMenu.Root open={open} onOpenChange={setOpen}>
          <DropdownMenu.Trigger
            className={`inline-flex items-center justify-center rounded-md border border-gray-700 px-4 py-2 text-sm font-medium ${
              open
                ? "bg-gray-800 text-gray-100"
                : "bg-black text-gray-300 hover:bg-gray-900"
            }`}
          >
            Google Drive
            <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
          </DropdownMenu.Trigger>

          <DropdownMenu.Content
            align="start"
            className="relative min-w-[300px] max-h-[300px] bg-black border border-gray-700 rounded-md shadow-lg p-1 z-50 overflow-y-auto"
          >
            {/* Disconnect Button */}
            <button
              className="absolute top-2 right-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={() => {
                signOut()
                setOpen(false);
              }}
            >
              Disconnect
            </button>

            {/* Dropdown Items */}
            <div className="mt-8">
              {items.map((item) => renderDropdownItem(item))}
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ) : (
        <p className="text-gray-500">No items found <button
        className="bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        onClick={() => {
          signOut()
          setOpen(false);
        }}
      >
        Disconnect Drive
      </button></p>
      )}
    </>
  );
}