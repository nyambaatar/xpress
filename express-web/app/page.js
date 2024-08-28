// flex min-h-screen flex-col items-center justify-between p-24

"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadList() {
    const name = await fetch("http://localhost:4000/categories")
    const data = await name.json()

    setCategories(data);
  }
  useEffect(() => {
    loadList();
  }, []);

  async function createNew() {
    const ner = prompt("Name..");
    if (ner) {
      const name = await fetch("http://localhost:4000/categories", {
        method: "POST",
        body: JSON.stringify({ name: ner }),
        headers: {
          "Content-type": "application/json;charset=UTF-8"
        }
      })
      loadList()
    }
  }


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

const update = async (oldName, id) => {
  const newName = prompt("insert name", oldName);
  const response = await fetch(`http://localhost:4000/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name: newName, }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
  })
  loadList();
}

return (
  <main>
    <button onClick={createNew}>ADD NEW</button>
    {categories.map((category) => (
      <div key={category.id}>{category.name} <button onClick={() => update(category.name, category.id)}> EDIT</button>
        <button disabled={loading} onClick={() => handleDelete(category.id, category.name)}> DELETED</button>
      </div>
    ))}
  </main>
)
}
