import app from "./app"
import { connectToDatabase } from "./db/connectionDB"


//Connections and List (Opening server)
const PORT = process.env.PORT || 5000

connectToDatabase().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is live at port,${PORT}`)
    })
  }
).catch(err=>console.log(err))


