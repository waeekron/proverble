package main

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"github.com/waeekron/proverble/backend/models"
)

var (
	proverbIdx = 1
	db         *sql.DB
)

type Env struct {
	proverbs models.ProverbModel
}

func main() {
	// Initialize database connection.
	db, err := sql.Open("postgres", "postgres://admin:admin@localhost:5432/proverb?sslmode=disable")

	if err != nil {
		log.Fatal(err)
	}

	// Initialize Env with a models.ProverbModel instance
	env := &Env{
		proverbs: models.ProverbModel{DB: db},
	}

	router := gin.Default()

	api := router.Group("/api")

	api.GET("/proverbs/today", env.get)
	api.GET("/proverbs/count", env.getCount)
	router.Run("localhost:8080")

}

func (env *Env) get(c *gin.Context) {
	// Execute the SQL query by calling the Get() method.
	pro, err := env.proverbs.Get(1)
	if err != nil {
		log.Print(err)
		// http.Error(w, http.StatusText(500), 500)
		c.IndentedJSON(http.StatusNotFound, err)
		return
	}
	c.IndentedJSON(http.StatusOK, pro)
}

func (env *Env) getCount(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, env.proverbs.GetCount())
}
