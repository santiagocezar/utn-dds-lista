import { FormEvent, useEffect, useState } from 'react'
import './style/lista.css'
import ItemLista, { ItemListaData } from './ItemLista'
import Add from '~icons/hugeicons/add-01'
import Multiplication from '~icons/hugeicons/multiplication-sign'
import { parseCantidad } from './util'

function cargarLista() {
    return JSON.parse(localStorage.getItem("lista") ?? "[]")
}

function guardarLista(lista: ItemListaData[]) {
    return localStorage.setItem("lista", JSON.stringify(lista))
}

export default function Lista() {
    const [lista, setLista] = useState<ItemListaData[]>(cargarLista())
    const [ultimaID, setUltimaID] = useState<number>(Math.max(0, ...lista.map((item) => item.uid)))

    useEffect(() => {
        guardarLista(lista)
    }, [lista])

    function agregarItem(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!(e.target instanceof HTMLFormElement)) return

        const data = new FormData(e.target)
        const nombre = data.get("nombre")?.toString()
        const cantidad = parseCantidad(data.get("cantidad")?.toString())
        
        if (!nombre) return
        
        setLista([...lista, {
            uid: ultimaID,
            nombre,
            cantidad,
            comprado: false
        }])

        setUltimaID(ultimaID + 1)

        e.target.reset()
    }

    function cambiarItem(i: number, nuevo: ItemListaData) {
        const nuevaLista = lista.slice()
        if (nuevaLista[i].comprado != nuevo.comprado) {
            nuevaLista.splice(i, 1)
            nuevaLista.push(nuevo)
        } else {
            nuevaLista[i] = nuevo
        }
        setLista(nuevaLista)
    }

    function borrarItem(i: number) {
        const nuevaLista = lista.slice()
        nuevaLista.splice(i, 1)
        setLista(nuevaLista)
    }

    const indexado = lista.map((item, i) => ({
        item, i
    }))

    const pendiente = indexado.filter(({ item }) => !item.comprado)
    const comprado = indexado.filter(({ item }) => item.comprado)

    return (
        <div className="compras">
            <ul>
                {pendiente.map(({item, i}) => (
                    <ItemLista 
                        item={item}
                        key={item.uid}
                        onChange={(nuevo) => cambiarItem(i, nuevo)}
                        onDelete={() => borrarItem(i)}
                    />
                ))}
                {pendiente.length > 0 && comprado.length > 0 && <h2>Comprado</h2>}
                {comprado.map(({item, i}) => (
                    <ItemLista 
                        item={item}
                        key={item.uid}
                        onChange={(nuevo) => cambiarItem(i, nuevo)}
                        onDelete={() => borrarItem(i)}
                    />
                ))}
            </ul>
            <form action="#" onSubmit={agregarItem}>
                <div className="producto-inputs">
                    <input placeholder="Producto" className="nombre" name="nombre" type="text" />
                    <div className="cantidad">
                        <Multiplication />
                        <input className="cantidad" name="cantidad" type="number" defaultValue={1} />
                    </div>
                </div>
                <div className="colors">
                    {' '}
                </div>
                <div className="actions">
                    <button>
                        <Add />
                        Agregar
                    </button>
                </div>
            </form>

        </div>
    )
}