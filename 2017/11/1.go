package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	d := make(map[string][]int)
	p := []int{0, 0, 0}

	d["n"] = []int{0, 1, -1}
	d["s"] = []int{0, -1, 1}
	d["ne"] = []int{1, 0, -1}
	d["nw"] = []int{-1, 1, 0}
	d["se"] = []int{1, -1, 0}
	d["sw"] = []int{-1, 0, 1}

	reader := bufio.NewReader(os.Stdin)
	input, _ := reader.ReadString('\n')

	steps := strings.Split(input, ",")

	for _, s := range steps {
		p[0] += d[s][0]
		p[1] += d[s][1]
		p[2] += d[s][2]
	}
	fmt.Println(distance(p[0], p[1], p[2], 0, 0, 0))
}

func distance(x1 int, y1 int, z1 int, x2 int, y2 int, z2 int) int {
	xr := x2 - x1
	yr := y2 - y1
	zr := z2 - z1

	if xr < 0 {
		xr = -xr
	}

	if yr < 0 {
		yr = -yr
	}

	if zr < 0 {
		zr = -zr
	}

	return (xr + yr + zr) / 2

}
