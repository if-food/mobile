interface Produto {
    nome: string | undefined;
    imagem: string;
    titulo: string;
    descricao: string;
    valorUnitario: number;
  }
  
  interface Item {
    produto: Produto;
    quantidade: number;
    precoUnitario: number;
    subtotal: number;
  }
  
  export interface Pedido {
    id: number;
    itens: Item[];
    statusEntrega: string;
    valorTotal?: number;
  }