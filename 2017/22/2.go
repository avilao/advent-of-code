package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

type Coordinate struct {
	x, y int
}

func main() {
	// your code goes here
	scanner := bufio.NewScanner(os.Stdin)

	var dirs = []Coordinate{
		Coordinate{0, 1},
		Coordinate{1, 0},
		Coordinate{0, -1},
		Coordinate{-1, 0}}

	m := make(map[Coordinate]string)
	//s := make(map[Coordinate]string)

	row := 0
	l := 0
	for scanner.Scan() {
		line := scanner.Text()

		mapLine := strings.Split(line, "")
		l = len(mapLine) / 2
		for col, v := range mapLine {
			m[Coordinate{col, row}] = v
		}

		row++
	}

	pos := Coordinate{l, l}
	dir := 2
	infections := 0

	for r := 0; r < 10000000; r++ {
		_, exist := m[pos]
		if !exist {
			m[pos] = "."
		}

		switch m[pos] {
		case ".":
			m[pos] = "W"
			dir = (dir + 1) % 4
		case "W":
			m[pos] = "#"
			infections++
		case "#":
			m[pos] = "F"
			dir = (dir + 4 - 1) % 4
		case "F":
			m[pos] = "."
			dir = (dir + 2) % 4
		}

		pos.x += dirs[dir].x
		pos.y += dirs[dir].y
	}
	fmt.Println(infections)
}
