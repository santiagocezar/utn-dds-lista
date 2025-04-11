import { FormEvent, useState } from 'react'
import Edit from '~icons/hugeicons/pencil-edit-01'
import Remove from '~icons/hugeicons/remove-01'
import Tick from '~icons/hugeicons/tick-02'
import Multiplication from '~icons/hugeicons/multiplication-sign'
import { parseCantidad } from './util'

export interface ItemListaData {
    uid: number
    nombre: string
    cantidad: number
    comprado: boolean
}

export interface ItemListaProps {
    item: ItemListaData

    onChange(next: ItemListaData): void
    onDelete(): void
}

export default function ItemLista (props: ItemListaProps) {
    const [editing, setEditing] = useState(false)

    function confirmarEdit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!(e.target instanceof HTMLFormElement)) return

        if (editing) {
            
            const data = new FormData(e.target)
            const nombre = data.get("nombre")?.toString()
            const cantidad = parseCantidad(data.get("cantidad")?.toString())

            if (!nombre) return
            
            props.onChange({
                ...props.item,
                nombre,
                cantidad,
            })
        }

        setEditing(!editing)
    }
    

    return <li className="item-lista">
        {editing ? (
            <button className='danger' onClick={() => props.onDelete()}>
                <Remove />
            </button>
        ) : (
            <label className="checkbox">
                <input 
                    checked={props.item.comprado}
                    type="checkbox"
                    onChange={(e) => props.onChange({...props.item, comprado: e.target.checked})}
                />
                <Tick />
            </label>
        )}
        <form className="producto-inputs" action="#" onSubmit={confirmarEdit}>
                {editing ? (
                    <input
                        placeholder="Producto"
                        className="nombre"
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
            <div className="cantidad">
                <Multiplication />
                {editing ? (
                    <input
                        className="cantidad"
                        name="cantidad"
                        type="number"
                        disabled={!editing}
                        defaultValue={props.item.cantidad}
                    />
                ) : (
                    <p className="cantidad">
                        {props.item.cantidad}
                    </p>
                )}
                <button>
                    {editing ? (
                        <Tick />
                    ) : (
                        <Edit />
                    )}
                </button>
            </div>
        </form>
    </li>
}