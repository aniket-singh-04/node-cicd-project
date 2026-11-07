import { app } from "./src/app.js";

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});