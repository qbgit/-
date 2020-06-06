package main
/*
author:钱波
*/
import (
    "fmt"
    _ "github.com/go-sql-driver/mysql"
    "github.com/jmoiron/sqlx"
	 "net/http"
)
 
var (
    userName  string = "root"
    password  string = "root"
    ipAddrees string = "localhost"
    port      int    = 3306
    dbName    string = "test"
    charset   string = "utf8"
)
 
func connectMysql() (*sqlx.DB) {
    dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=%s", userName, password, ipAddrees, port, dbName, charset)
    Db, err := sqlx.Open("mysql", dsn)
    if err != nil {
        fmt.Printf("mysql connect failed, detail is [%v]", err.Error())
		return nil
    }
	Db.SetMaxOpenConns(20)
	Db.SetMaxIdleConns(15)
    return Db
}
//返回最新的ID
func addRecord(Db *sqlx.DB)(userid int64) {

        result, err := Db.Exec("insert into test_user(avatar,name)  values(?,?)","qianbo", "123456")
        if err != nil {
            fmt.Printf("data insert faied, error:[%v]", err.Error())
            return -1
        }
        id, _ := result.LastInsertId()
        fmt.Printf("insert success, last id:[%d]\n", id)
		return id
    //for i:=0; i<2; i++ {//}
}
//更新数据 
func updateRecord(Db *sqlx.DB, id int64){
    result, err := Db.Exec("update test_user set name = 'test' where id = ?",id)
    if err != nil {
        fmt.Printf("update faied, error:[%v]", err.Error())
        return
    }
    num, _ := result.RowsAffected()
    fmt.Printf("update success, affected rows:[%d]\n", num)
}
 
func deleteRecord(Db *sqlx.DB,id int64){

    result, err := Db.Exec("delete from test_user where id = ?",id)
    if err != nil {
        fmt.Printf("delete faied, error:[%v]", err.Error())
        return
    }
    num, _ := result.RowsAffected()
    fmt.Printf("delete success, affected rows:[%d]\n", num)
}


func IndexHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "go lang server qianbo")
}

func userHandler_add(w http.ResponseWriter, r *http.Request){

}

func userHandler_update(w http.ResponseWriter, r *http.Request){

}

func userHandler_delete(w http.ResponseWriter, r *http.Request){
}

func userHandler_select(w http.ResponseWriter, r *http.Request){
   
    fmt.Println("r.Method = ", r.Method)
    fmt.Println("r.URL = ", r.URL)
    fmt.Println("r.Header = ", r.Header)
    fmt.Println("r.Body = ", r.Body)
    fmt.Fprintf(w,"HelloWorld!")

}


 
func main() {
    var Db *sqlx.DB = connectMysql()
    defer Db.Close()
	//addRecord(Db)

	fmt.Println("server start at 9000 port")
    http.HandleFunc("/", IndexHandler)
    http.ListenAndServe("127.0.0.1:9000", nil)

    //var id = addRecord(Db)
   // updateRecord(Db,id)
   // deleteRecord(Db,id)
}