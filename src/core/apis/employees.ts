import BaseNetwork from "../network/baseNetwork";

export async function get() {
    return BaseNetwork.getAll(`employees`);
}

export async function getOneDoc(id : string) {
    return BaseNetwork.getOneDoc(`employees` , id);
}

export async function post(body :any , id : any) {
  return BaseNetwork.set(`employees` , body , id);
}

export async function update(body :object , id : string) {
    return BaseNetwork.put(`employees` , body , id);
}

export async function remove(id : string) {
  return BaseNetwork.delete(`employees` , id);
}