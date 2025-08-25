# Условие: на вход поступает массив целых чисел.
# На выходе необходимо вывести массив, в котором все нули расположены в конце, а остальные числа сохраняют свой порядок.
# Пример
# Вход: 7 0 1 15 0 0 3 9 0 25
# Выход: 7 1 15 3 9 25 0 0 0 0

values = [7, 0, 1, 15, 0, 0, 3, 9, 0, 25]

def solution1(nums):
    i = 0
    n = len(nums)
    while i < n:
        if nums[i] == 0:
            ind = i
            for j in range(ind + 1, len(nums)):
                nums[ind], nums[j] = nums[j], nums[ind]
                ind += 1
            n -= 1
        else:
            i += 1
    return nums

def solution2(nums):
    i = 0
    for j in range(len(nums)):
        if nums[j] != 0:
            nums[i], nums[j] = nums[j], nums[i]
            i += 1
    return nums

print('values:\t\t',values)
print('solution1:\t', solution1(values))
print('solution2:\t', solution2(values))
