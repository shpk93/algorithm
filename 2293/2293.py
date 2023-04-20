import sys
sys.stdin = open('input.txt')
input = sys.stdin.readline
n,k = map(int,input().split(' '))
coins = [int(input()) for _ in range(n)]


def solution(n,k,coins):
    dp = [0 for _ in range(10005)]
    dp[0] = 1
    for coin in coins:
        for n in range(0,10000-coin+1):
            if dp[n] : dp[n+coin] += dp[n]

    return dp[k]


print(solution(n,k,coins))


