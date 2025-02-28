import axios from "axios"
import { useAppStore } from "@/stores/app"

const instance = axios.create({
    baseURL: "http://localhost:8080/"
})

instance.interceptors.request.use((config) => {
    const app = useAppStore()
    app.loading = true
    return config
})

instance.interceptors.response.use((response) => {
    const app = useAppStore()
    app.loading = false
    return response
})

export default instance