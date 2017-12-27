// TODO: remove duplicates from possible paths

package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Port struct {
	x, y int
}

var results [][]Port

func main() {
	// your code goes here
	scanner := bufio.NewScanner(os.Stdin)

	var ports []Port
	var used []Port

	for scanner.Scan() {
		line := scanner.Text()

		port := strings.Split(line, "/")

		end1, _ := strconv.Atoi(port[0])
		end2, _ := strconv.Atoi(port[1])

		ports = append(ports, Port{end1, end2})

	}

	findBridge(ports, used, 0)

	max := 0
	for _, v := range results {
		s := 0
		for _, p := range v {
			s += p.x + p.y
		}

		if s > max {
			max = s
		}
	}

	fmt.Println(max)
}

func findBridge(available []Port, used []Port, end int) {
	for index, p := range available {
		if p.x == end || p.y == end {
			newPorts := copyPorts(available)
			newPorts = append(newPorts[:index], newPorts[index+1:]...)

			newUsed := copyPorts(used)
			newUsed = append(newUsed, p)
			newEnd := 0

			if p.x == end {
				newEnd = p.y
			} else {
				newEnd = p.x
			}

			findBridge(newPorts, newUsed, newEnd)
		} else {
			results = append(results, used)
		}

	}
}

func copyPorts(ports []Port) []Port {
	var newPorts []Port

	for i := 0; i < len(ports); i++ {
		newPorts = append(newPorts, ports[i])
	}

	return newPorts
}
