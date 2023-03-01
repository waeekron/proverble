package models

import (
	"database/sql"
	"fmt"
)

type Proverb struct {
	Content string `json:"content"`
	ID      int    `json:"id"`
}

type ProverbModel struct {
	DB *sql.DB
}

func (m ProverbModel) Get(idx int) (Proverb, error) {
	var pro Proverb
	queryStr := fmt.Sprintf("SELECT content, id FROM proverbs WHERE id=%d", idx)
	row := m.DB.QueryRow(queryStr)

	if err := row.Scan(&pro.Content, &pro.ID); err != nil {
		if err == sql.ErrNoRows {
			return pro, fmt.Errorf("Get idx %d: no such proverb", idx)
		}
		return pro, fmt.Errorf("Get with idx %d: %v", idx, err)
	}
	return pro, nil
}

func (m ProverbModel) GetCount() int64 {
	var count int64
	row := m.DB.QueryRow("SELECT COUNT(*) FROM proverbs")
	if err := row.Scan(&count); err != nil {
		return count
	}
	return count
}
