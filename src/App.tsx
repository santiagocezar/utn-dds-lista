import { FormEvent, useState } from 'react'
import Lista from './Lista'
import Dialog from './Dialog'
import Add from '~icons/hugeicons/add-01'

function App() {
    const [listas, setListas] = useState([
        "Por defecto",
        "Supermercado",
        "Materiales",
    ])
    const [currentLista, setCurrentLista] = useState(listas[0])
    const [menuAbridoOAbierto, setMenuAbridoOAbierto] = useState(false)

    function agregarLista(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!(e.target instanceof HTMLFormElement)) return

        const data = new FormData(e.target)
        const nombre = data.get("nombre")?.toString()
        
        if (!nombre) return

        setListas([...listas, nombre])
        setMenuAbridoOAbierto(false)

        e.target.reset()
    }

    return (
        <main>
            <header className="main-header">
                <select value={currentLista} onChange={e => setCurrentLista(e.target.value)} id="current">
                    {listas.map(lista => (
                        <option key={lista} value={lista}>{lista}</option>
                    ))}
                </select>
                <button id="menu" onClick={() => setMenuAbridoOAbierto(!menuAbridoOAbierto)}>Agregar</button>
            </header>
            <Lista key={currentLista} id={currentLista} />
            <Dialog open={menuAbridoOAbierto} onClose={() => setMenuAbridoOAbierto(false)}>
                <form class="agregar-lista" action="#" onSubmit={agregarLista}>
                    <label htmlFor="nombre">Nombre de la lista</label>
                    <input type="text" name="nombre" id="nombre" />
                    <button className='pretty-button'>
                        <Add />
                        Agregar
                    </button>
                </form>
            </Dialog>
        </main>
    )
}

export default App
