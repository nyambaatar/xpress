// flex min-h-screen flex-col items-center justify-between p-24

"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import { Input } from "@/components/ui/input";
import { CircleDot, Clock, Fingerprint, House, Icon, IdCardIcon, Image, Joystick, Mic,} from "lucide-react";

// icons list
const categoryIcons = [
  { 
    name: 'home',
    Icon: House,
  },
  { 
    name: 'fingerprint',
    Icon: Fingerprint,
  },
  { 
    name: 'image',
    Icon: Image,
  },
  { 
    name: 'card',
    Icon: IdCardIcon,
  },
  { 
    name: 'joystick',
    Icon: Joystick,
  },
  { 
    name: 'clock',
    Icon: Clock,
  },

]
// color list 
const categoryColors = [
  {
    name: 'blue',
    value: '#0166ff',
  },
  {
    name: 'Sky',
    value: '#01b3ff',
  },
  {
    name: 'Lime',
    value: '#41cc00',
  },
  {
    name: 'Sun',
    value: '#F9d100',
  },
  {
    name: 'Orange',
    value: '#FF7b01',
  },
  {
    name: 'Pink',
    value: '#AE01ff',
  },

]


export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");



  //LOADLIST
  async function loadList() {
    const name = await fetch("http://localhost:4000/categories")
    const data = await name.json()

    setCategories(data);
  }
  useEffect(() => {
    loadList();
  }, []);


  //CREATE
  async function createNew() {
    const ner = prompt("Name..");
    if (ner) {
      const name = await fetch("http://localhost:4000/categories", {
        method: "POST",
        body: JSON.stringify({ name: ner, color: color, }),
        headers: {
          "Content-type": "application/json;charset=UTF-8"
        }
      })
      loadList()
    }
  }
  //DELETE
  async function handleDelete(id, name) {
    if (confirm(name)) {

      setLoading(true)
      const responce = await fetch(`http://localhost:4000/categories/${id}`, {
        method: "DELETE",
      })
      loadList();
    }
    setLoading(false);
  }
  //UPDATE
  const update = async (oldName, id) => {
    const newName = prompt("end nere bicheere", oldName);
    const response = await fetch(`http://localhost:4000/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name: newName, }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    })
    loadList();
  }

  //check
  console.log({color})

  // RETURN
  return (
    <main>
      <Button variant="secondary" onClick={() => setOpen(true)}>Add Category</Button>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-4 rounded">
            <div className="grid grid-cols-4 items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary">
                    <House/>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-blue-400 items-center content-center">
                  <div className="grid grid-cols-6">{categoryIcons.map(({name, Icon}) => (
                <div key={name}>
                  <Icon/>
                </div>
                ))}
                </div>
                <div className="grid grid-cols-6"> {categoryColors.map (({name, value})=>(
                  <div key={name} onClick={()=> setColor(name)}><div className="w-8 h-8 rounded-full text-white flex justify-center items-center" style={{backgroundColor: value}}>
                    {
                      color === name && <CircleDot className="w-4 h-4"/>
                    }
                    </div>
                  </div>
                ))}
                </div>
                </PopoverContent>
              </Popover>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"/>
            </div>
          </div>
          <DialogFooter>
            <Button className="rounded-full w-full bg-green-600 hover:bg-green-800" onClick={createNew}></Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {categories.map((category) => (
        <div key={category.id}>{category.name}
          <button onClick={() => update(category.name, category.id)}> EDIT</button>
          <button disabled={loading} onClick={() => handleDelete(category.id, category.name)}> DELETED</button>
        </div>
      ))}
    </main>
  )
}
