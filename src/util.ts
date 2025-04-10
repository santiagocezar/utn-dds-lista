export function parseCantidad(text: string | undefined) {            
    const cantidad = parseInt(text || "1")
    
    return isNaN(cantidad) ? 1 : cantidad
}