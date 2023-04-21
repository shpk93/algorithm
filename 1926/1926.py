import sys
from collections import deque 
# sys.stdin = open('input.txt','r')
input = sys.stdin.readline
N,M = map(int,input().split())
board = [list(map(int,input().split())) for _ in range(N)]

def solution(N,M,board):
   answer = [0,0]
   visit = [[0]*M for _ in range(N)]

   for y in range(N):
      for x in range(M):
         if board[y][x] ==1 and visit[y][x] ==0 :
            size = bfs(y,x,board,visit)
            answer[0]+=1
            answer[1] = max(answer[1],size)
         
                

   return '\n'.join(map(str,answer))

# 

def bfs(sy,sx,board,visit):
      dx = (0,0,-1,1)
      dy = (-1,1,0,0)
      queue = deque([(sy,sx)])
      size = 1
      visit[sy][sx] = size
      
      while queue : 
          y,x = queue.popleft()
          for i in range(4):
              ny = y+ dy[i]
              nx = x+ dx[i]
              if 0<=ny<N and 0<=nx<M and board[ny][nx] == 1 and visit[ny][nx] == 0:
                  size+=1
                  visit[ny][nx] = size
                  queue.append((ny,nx))
    
      return size
      

print(solution(N,M,board))