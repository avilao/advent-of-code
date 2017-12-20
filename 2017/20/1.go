package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// Point structure
type Point struct {
	c Coordinate
	v Coordinate
	a Coordinate
}

// Coordinate system
type Coordinate struct {
	x int
	y int
	z int
}

func main() {
	// your code goes here
	scanner := bufio.NewScanner(os.Stdin)

	var points []Point

	for scanner.Scan() {
		line := scanner.Text()
		line = strings.Replace(line, "<", "", -1)
		line = strings.Replace(line, ">", "", -1)
		line = strings.Replace(line, "p", "", -1)
		line = strings.Replace(line, "a", "", -1)
		line = strings.Replace(line, "v", "", -1)
		line = strings.Replace(line, "=", "", -1)
		line = strings.Replace(line, " ", "", -1)

		var p Point
		x := strings.Split(line, ",")

		p.c.x, _ = strconv.Atoi(x[0])
		p.c.y, _ = strconv.Atoi(x[1])
		p.c.z, _ = strconv.Atoi(x[2])
		p.v.x, _ = strconv.Atoi(x[3])
		p.v.y, _ = strconv.Atoi(x[4])
		p.v.z, _ = strconv.Atoi(x[5])
		p.a.x, _ = strconv.Atoi(x[6])
		p.a.y, _ = strconv.Atoi(x[7])
		p.a.z, _ = strconv.Atoi(x[8])

		points = append(points, p)
	}
	//fmt.Println(points)
	for r := 0; r < 10000; r++ {
		for i := 0; i < len(points); i++ {
			// update speed
			points[i].v.x += points[i].a.x
			points[i].v.y += points[i].a.y
			points[i].v.z += points[i].a.z

			// update position
			points[i].c.x += points[i].v.x
			points[i].c.y += points[i].v.y
			points[i].c.z += points[i].v.z

			//d := points[i].c.x + points[i].c.y + points[i].c.z
			//fmt.Println(d, points[i])

		}
		//fmt.Println("")

	}

	distance := 99999999999
	index := -1

	for i, p := range points {
		pd := 0

		if p.c.x > 0 {
			pd += p.c.x
		} else {
			pd -= p.c.x
		}

		if p.c.y > 0 {
			pd += p.c.y
		} else {
			pd -= p.c.y
		}

		if p.c.z > 0 {
			pd += p.c.z
		} else {
			pd -= p.c.z
		}

		if pd < distance {
			distance = pd
			index = i
		}
	}

	fmt.Println(index)
}
