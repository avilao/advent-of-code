// TODO: remove duplicates from possible paths

package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Instruction struct {
	direction int
	value     int
	newState  string
}

type State struct {
	state string
	inst  int
}

func main() {
	buf := make(map[int]int)
	states := make(map[State]Instruction)

	// your code goes here
	scanner := bufio.NewScanner(os.Stdin)

	currentState := "A"
	currentInstruction := 0
	var initialState string
	var rounds int
	for scanner.Scan() {
		line := scanner.Text()
		line = strings.Replace(line, ":", "", -1)
		line = strings.Replace(line, ".", "", -1)
		line = strings.Replace(line, "-", "", -1)
		line = strings.Trim(line, " ")

		input := strings.Split(line, " ")
		//fmt.Println(line)

		state := State{currentState, currentInstruction}
		_, exist := states[state]

		if !exist {
			state := State{currentState, currentInstruction}
			i := new(Instruction)
			states[state] = *i
		}

		switch input[0] {
		case "Begin":
			initialState = input[3]

		case "Perform":
			v, _ := strconv.Atoi(input[5])
			rounds = v

		case "In":
			currentState = input[2]

		case "If":
			i, _ := strconv.Atoi(input[5])
			currentInstruction = i

		case "Write":
			v, _ := strconv.Atoi(input[3])
			i := states[state]
			i.value = v
			states[state] = i

		case "Move":
			i := states[state]
			if input[5] == "right" {
				i.direction = 1
			} else {
				i.direction = -1
			}
			states[state] = i

		case "Continue":
			i := states[state]
			i.newState = input[3]
			states[state] = i
		}
	}

	index := 0
	currentState = initialState
	for r := 0; r < rounds; r++ {
		_, exist := buf[index]
		if !exist {
			buf[index] = 0
		}

		posValue := buf[index]
		state := states[State{currentState, posValue}]

		buf[index] = state.value
		currentState = state.newState
		index += state.direction
	}

	sum := 0
	for _, v := range buf {
		sum += v
	}
	fmt.Println(sum)
}
