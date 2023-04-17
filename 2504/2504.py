import sys
from collections import deque 
sys.stdin = open('input.txt','r')
input = sys.stdin.readline().rstrip()
def solution(input):
    stack = deque()
    answer = 0
    for s in input:
        if s ==')':
            boolean = False
            num = 1
            while stack:
                top = stack.pop()
                if type(top) is int:
                  num = top if num ==1 else num + top 
                elif top == '(':
                    stack.append(num *2)
                    boolean = True
                    break
                else : return 0
            if not boolean : return 0 
        elif s ==']':
            boolean = False
            num = 1
            while stack:
                top = stack.pop()
                if type(top) is int:
                  num = top if num ==1 else num + top 
                elif top == '[':
                    stack.append(num * 3)
                    boolean = True
                    break
                else: return 0
            if not boolean : return 0 
        else : stack.append(s)

    while stack : 
        top = stack.pop()
        if type(top) is not int : return 0
        else : answer += top

    return answer


print(solution(input))