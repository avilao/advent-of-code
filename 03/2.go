// Reading and writing files are basic tasks needed for
// many Go programs. First we'll look at some examples of
// reading files.

package main

import "fmt"

// Reading files requires checking most calls for errors.
// This helper will streamline our error checks below.
func check(e error) {
	if e != nil {
		panic(e)
	}
}

var directions = [][]int{
	[]int{1, 0},
	[]int{0, -1},
	[]int{-1, 0},
	[]int{0, 1}}

func main() {

	n := 368078
	const size int = 1000
	var matrix [size][size]int

	x := 500
	y := 500

	matrix[x][y] = 1

	dirIndex := 1
	currDir := directions[0]
	nextDir := directions[1]

	for {
		x += currDir[0]
		y += currDir[1]

		matrix[x][y] += matrix[x+1][y]
		matrix[x][y] += matrix[x-1][y]
		matrix[x][y] += matrix[x][y+1]
		matrix[x][y] += matrix[x][y-1]
		matrix[x][y] += matrix[x+1][y+1]
		matrix[x][y] += matrix[x+1][y-1]
		matrix[x][y] += matrix[x-1][y+1]
		matrix[x][y] += matrix[x-1][y-1]

		if n < matrix[x][y] {
			break
		}

		if matrix[x+nextDir[0]][y+nextDir[1]] == 0 {
			dirIndex = (dirIndex + 1) % 4
			currDir = nextDir
			nextDir = directions[dirIndex]
		}

		/*for a := 0; a < size; a++ {
			for b := 0; b < size; b++ {
				fmt.Print(matrix[b][a], "\t")
			}
			fmt.Print("\n")
		}*/
	}

	fmt.Print(matrix[x][y])
}
