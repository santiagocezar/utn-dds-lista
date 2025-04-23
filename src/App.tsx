import { Tabs } from 'radix-ui';
import { FormEvent, useState } from 'react'
import Lista from './Lista'
import Dialog from './Dialog'
import Add from '~icons/hugeicons/add-02'
import { useLiveQuery } from 'dexie-react-hooks';

import { nuevaLista, todasLasListas } from './lista';

function App() {
    const listas = useLiveQuery(() => todasLasListas())
    
    const [menuAbridoOAbierto, setMenuAbridoOAbierto] = useState(false)

    function agregarLista(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!(e.target instanceof HTMLFormElement)) return

        const data = new FormData(e.target)
        const nombre = data.get("nombre")?.toString()
        
        if (!nombre) return

        nuevaLista({
            nombre,
            color: "var(--accent-bg)"
        })

        setMenuAbridoOAbierto(false)

        e.target.reset()
    }

    return listas && (
        <Tabs.Root asChild defaultValue={"" + listas[0].id}>
            <main>
                <header className="main-header">
                    <Tabs.List className="tab-list">
                        <div className="tab-list-scroll">
                            {listas.map((lista) => (
                                <Tabs.Trigger
                                    onFocus={(e) => e.target instanceof HTMLElement && e.target.scrollIntoView({ behavior: "smooth" })}
                                    className="tab" key={lista.id} value={"" + lista.id}
                                >
                                    {lista.nombre}
                                </Tabs.Trigger>
                            ))}
                        </div>
                    </Tabs.List>
                    <button className='add-tab' onClick={() => setMenuAbridoOAbierto(!menuAbridoOAbierto)}><Add/></button>
                </header>
                {listas && listas.map((lista) => (
                    <Tabs.Content key={lista.id} value={"" + lista.id}>
                        <Lista lista={lista} />
                    </Tabs.Content>
                ))}
                    
                {/* <header >
                    <select value={currentLista} onChange={e => setCurrentLista(e.target.value)} id="current">
                        {listas.map(lista => (
                            <option key={lista} value={lista}>{lista}</option>
                        ))}
                    </select>
                    <button id="menu" >Agregar</button>
                </header> */}
                <Dialog open={menuAbridoOAbierto} onClose={() => setMenuAbridoOAbierto(false)}>
                    <form className="agregar-lista" action="#" onSubmit={agregarLista}>
                        <label htmlFor="nombre">Nombre de la lista</label>
                        <input type="text" name="nombre" id="nombre" />
                        <button className='pretty-button'>
                            <Add />
                            Agregar
                        </button>
                    </form>
                </Dialog>
            </main>
        </Tabs.Root>
    )
}

export default App
