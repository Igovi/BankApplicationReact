import { create } from "zustand";

interface UsuarioStore {
    usuarioLogado: string;
    tentouLogar: boolean;

    setUsuarioLogado: (usuario: string) => void;
    setTentouLogar: (valor: boolean) => void;
}

const useUsuarioStore = create<UsuarioStore>((set) => ({
    usuarioLogado: "",
    tentouLogar: false,

    setUsuarioLogado: (usuario: string) => set(() => ({ usuarioLogado: usuario })),
    setTentouLogar: (valor: boolean) => set(() => ({ tentouLogar: valor })),
}));
export default useUsuarioStore;
