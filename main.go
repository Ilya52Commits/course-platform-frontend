package main

import (
	"log"
	"net/http"

	"domain/controllers"
)

func main() {
	http.HandleFunc("/", controllers.SayHello)           // Устанавливаем роутер
	err := http.ListenAndServe(":8080", nil) // устанавливаем порт веб-сервера
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}