// flex min-h-screen flex-col items-center justify-between p-24

"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  CircleDot,
  Clock,
  Fingerprint,
  House,
  Icon,
  IdCardIcon,
  Image,
  Joystick,
  Mic,
} from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

// icons list
const categoryIcons = [
  {
    name: "home",
    Icon: House,
  },
  {
    name: "fingerprint",
    Icon: Fingerprint,
  },
  {
    name: "image",
    Icon: Image,
  },
  {
    name: "card",
    Icon: IdCardIcon,
  },
  {
    name: "joystick",
    Icon: Joystick,
  },
  {
    name: "clock",
    Icon: Clock,
  },
];
// color list
const categoryColors = [
  {
    name: "blue",
    value: "#0166ff",
  },
  {
    name: "Sky",
    value: "#01b3ff",
  },
  {
    name: "Lime",
    value: "#41cc00",
  },
  {
    name: "Sun",
    value: "#F9d100",
  },
  {
    name: "Orange",
    value: "#FF7b01",
  },
  {
    name: "Pink",
    value: "#AE01ff",
  },
];

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState("home");
  const [color, setColor] = useState("Pink");
  const [name, setName] = useState("");
  const [editingCategory, setEditingCategory] = useState("");

  //LOADLIST
  async function loadList() {
    const name = await fetch("http://localhost:4000/categories");
    const data = await name.json();

    setCategories(data);
  }
  useEffect(() => {
    loadList();
  }, []);

  //CREATE
  async function createNew() {
    setLoading(true);
    await fetch("http://localhost:4000/categories", {
      method: "POST",
      body: JSON.stringify({ name: name, color: color, icon: icon }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    });
    loadList();
    setLoading(false);
    setOpen(false);
    toast("Succes");
  }
  //DELETE
  async function handleDelete(id, name) {
    if (confirm(name)) {
      setLoading(true);
      const responce = await fetch(`http://localhost:4000/categories/${id}`, {
        method: "DELETE",
      });
      loadList();
    }
    setLoading(false);
  }
  //UPDATE
  async function update(oldName, id) {
    const newName = prompt("end nere bicheere", oldName);
    const response = await fetch(`http://localhost:4000/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name: newName, icon: icon, color: color }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    loadList();
  }

  //check
  console.log({ editingCategory });

  useEffect(() => {
    if (editingCategory) {
      setOpen(true);
      setName(editingCategory.name);
      setColor(editingCategory.color);
      setIcon(editingCategory.icon);
    }
  }, [editingCategory]);

  // RETURN
  return (
    <main>
      <Toaster />
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Add Category
      </Button>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription> </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-4 rounded">
            <div className="grid grid-cols-4 items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary">
                    <House />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 items-center content-center">
                  <div className="grid grid-cols-6">
                    {categoryIcons.map(({ name, Icon }) => (
                      <div
                        key={name}
                        onClick={() => setIcon(name)}
                        className={`flex items-center justify-center py-2 ${
                          icon === name ? "bg-blue-200" : ""
                        }`}
                      >
                        <Icon />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-6">
                    {" "}
                    {categoryColors.map(({ name, value }) => (
                      <div key={name} onClick={() => setColor(name)}>
                        <div
                          className="w-8 h-8 rounded-full text-white flex justify-center items-center"
                          style={{ backgroundColor: value }}
                        >
                          {color === name && <CircleDot className="w-4 h-4" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <Input
                disabled={loading}
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={loading}
              className="rounded-full w-full bg-green-600 hover:bg-green-800"
              onClick={createNew}
            ></Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {categories.map((category) => (
        <div className="flex items-center" key={category.id}>
          <CategoryIcons iconName={category.icon} color={category.color} />
          {category.name}{" "}
          <Button onClick={(update) => setEditingCategory(category)}>
            EDIT
          </Button>
          <Button
            disabled={loading}
            onClick={() => handleDelete(category.id, category.name)}
          >
            {" "}
            DELETED
          </Button>
        </div>
      ))}
    </main>
  );
}

function CategoryIcons({ iconName, color }) {
  const iconObject = categoryIcons.find((item) => item.name === iconName);
  const colorObject = categoryColors.find((item) => item.name === color);
  if (!iconObject) {
    return null;
  }
  let hexColor;
  if (!colorObject) {
    hexColor = "#000";
  } else {
    hexColor = colorObject.value;
  }
  const { Icon } = iconObject;
  return <Icon style={{ color: hexColor }} />;
}
