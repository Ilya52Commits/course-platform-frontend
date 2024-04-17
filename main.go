package main

import (
	"log"
	"net/http"

	"github.com/Ilya52Commits/course-platform/controllers"
)

func main() {
	http.HandleFunc("/", controllers.SayHello)
	http.HandleFunc("/good-bye", controllers.SayGoodBye)
	err := http.ListenAndServe(":8080", nil)
	if err == nil {
		log.Fatal("ListenAndServer: ", err)
	}
}
