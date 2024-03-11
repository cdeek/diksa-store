import { Context } from "./context";
import { useContext } from "react"

const context = () => {
  const hook = useContext(Context)

  if(!hook) {

    throw Error('context must be used inside an ContextProvider.')
  }

  return hook;
}
export default context;