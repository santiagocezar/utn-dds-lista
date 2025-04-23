import Dexie, { EntityTable } from "dexie"

export interface ListaData {
    id: number
    nombre: string
    color: string
}

export interface ItemData {
    id: number
    lista: number
    nombre: string
    cantidad: number
    comprado: boolean
}

export const db = new Dexie("Listas") as Dexie & {
    listas: EntityTable<ListaData, "id">
    items: EntityTable<ItemData, "id">
} 

db.version(1).stores({
    listas: "++id,nombre,color",
    items: "++id,lista,nombre,cantidad,comprado"
})

export async function poblarDB() {
    const length = await db.listas.count()
    if (length === 0) {
        await db.listas.add({
            nombre: "Por defecto",
            color: "var(--accent-bg)"
        })
    }
}

poblarDB()

export async function todasLasListas() {
    return await db.listas.toArray()
}

export async function nuevaLista(lista: Omit<ListaData, "id">) {
    return await db.listas.add(lista)
}

export async function editarLista(lista: ListaData) {
    await db.listas.put(lista)
}

export async function obtenerDatosLista(id: number) {
    return await db.listas.get(id)
}

export async function obtenerItemsPara(id: number) {
    return await db.items.where("lista").equals(id).toArray()
}

export async function obtenerDatosItem(id: number) {
    return await db.listas.get(id)
}

export async function nuevoItem(item: Omit<ItemData, "id">) {
    return await db.items.add(item)
}

export async function editarItem(item: ItemData) {
    await db.items.put(item)
}

export async function borrarItem(id: number) {
    await db.items.delete(id)
}
export async function borrarLista(id: number) {
    await db.listas.delete(id)
}