import { PropsWithChildren, MouseEvent, useEffect, useRef } from "react"

export interface DialogProps {
    open: boolean
    onClose: () => void
}

export default function Dialog(props: PropsWithChildren<DialogProps>) {
    const menu = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        if(props.open) menu.current!.showModal()
        else menu.current!.close()
    }, [props.open])
    
    function dialogBackdropClicked(e: MouseEvent) {
        if (e.target === menu.current) props.onClose()
    }

    return (
        <dialog ref={menu} onClose={() => props.onClose()} onClick={dialogBackdropClicked}>
            <div className="dialog-content">
                {props.children}
            </div>
        </dialog>
    )
}