import { getApolloContext } from "@apollo/client"
import { useContext } from "react"

export const useApolloContext = () => {
  const context = useContext(getApolloContext())
  
  return {
    context,
    client: context?.client,
    enabled: !!context?.client
  }
}