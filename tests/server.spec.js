const request = require("supertest");
const server = require("../index");
//1-testea gt/cafes devuelva status 200 y el tipo de dato recibido es un array con al menos 1 obj
describe("Operaciones CRUD de cafes", () => {
    it("Obteniendo status 200", async()=> {
        const {body, status} = await request(server).get("/cafes").send();
        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBeGreaterThan(0);
    })
    it("Obteniendo status 404", async()=>{
        const jwt = "token";
        const idProductoEliminar = 5;
        const response = await request(server)
            .delete(`/cafes/${idProductoEliminar}`)
            .set("Authorization",jwt)
            .send();       
        expect(response.statusCode).toBe(404);
    })
    it("Obteniendo status 201",async()=>{
        const cafe = {id:5 , nombre:"Latte"};
        const response = await request(server)
            .post("/cafes")
            .send(cafe);
        expect(response.statusCode).toBe(201);
    })
    it("Obteniendo status 400",async()=>{
        const cafe = {id:2 , nombre:"Latte"};
        const response = await request(server)
            .put("/cafes/1")
            .send(cafe);
        expect(response.statusCode).toBe(400);
    })
});
