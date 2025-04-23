import { FormEvent, useEffect, useState } from 'react'
import './style/lista.css'
import ItemLista, { ItemListaData } from './ItemLista'
import Add from '~icons/hugeicons/add-01'
import Multiplication from '~icons/hugeicons/multiplication-sign'
import Remove from '~icons/hugeicons/remove-01'
import { parseCantidad } from './util'

import { borrarItem, editarItem, editarLista, ListaData, nuevoItem, obtenerItemsPara } from './lista'
import { useLiveQuery } from 'dexie-react-hooks'

export interface ListaProps {
    lista: ListaData
}

export default function Lista(props: ListaProps) {
    const items = useLiveQuery(() => obtenerItemsPara(props.lista.id))

    const [editing, setEditing] = useState(false)

    async function editarInfo(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!(e.target instanceof HTMLFormElement)) return

        if (editing) {
            
            const data = new FormData(e.target)
            const nombre = data.get("nombre")?.toString()

            if (!nombre) return
            
            await editarLista({
                ...props.lista,
                nombre,
            })
        }

        setEditing(!editing)
    }

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!(e.target instanceof HTMLFormElement)) return

        const data = new FormData(e.target)
        const nombre = data.get("nombre")?.toString()
        const cantidad = parseCantidad(data.get("cantidad")?.toString())
        
        if (!nombre) return
        
        await nuevoItem({
            lista: props.lista.id,
            nombre,
            cantidad,
            comprado: false
        })

        e.target.reset()
    }

    // const indexado = items.map((item, i) => ({
    //     item, i
    // }))

    const pendiente = items?.filter((item) => !item.comprado) ?? []
    const comprado = items?.filter((item) => item.comprado) ?? []

    return (
        <div className="compras">
            {/* <form className="titulo" action="#" onSubmit={editarInfo}>
                {editing && (
                    <button className='danger' onClick={() => borrarItem(props.item.id)}>
                        <Remove />
                    </button>
                )}
                {editing ? (
                    <input
                        placeholder="Lista"
                        className="nombrew "
                        name="nombre"
                        type="text"
                        disabled={!editing}
                        defaultValue={props.item.nombre}
                    />
                ) : (
                    <p className="cantidad" data-comprado={props.item.comprado}>
                        {props.item.nombre}
                    </p>
                )}
            </form> */}
            <ul>
                {pendiente.map((item) => (
                    <ItemLista 
                        item={item}
                        key={item.id}
                        // onChange={(nuevo) => editarItem(nuevo)}
                        // onDelete={() => borrarItem(i)}
                    />
                ))}
                {pendiente.length > 0 && comprado.length > 0 && <h2>Comprado</h2>}
                {comprado.map((item) => (
                    <ItemLista 
                        item={item}
                        key={item.id}
                        // onChange={(nuevo) => cambiarItem(i, nuevo)}
                        // onDelete={() => borrarItem(item.id)}
                    />
                ))}
            </ul>
            <form action="#" onSubmit={onSubmit}>
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
                    <button className='pretty-button'>
                        <Add />
                        Agregar
                    </button>
                </div>
            </form>

        </div>
    )
}