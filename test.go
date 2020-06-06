package main

import (
    "fmt"
    "net/http"
)

func IndexHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "hello world aaa")
}

func main() {
    fmt.Println("Hello, Worldddd!")
    http.HandleFunc("/", IndexHandler)
    http.ListenAndServe("127.0.0.1:9000", nil)
}