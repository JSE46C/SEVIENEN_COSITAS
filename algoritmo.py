def quick_sort(sequence):
    lenght = len(sequence)
    if lenght <= 1:
        return sequence
    else:
        pivot = sequence.pop()
    
    items_greater = []
    items_lower = []

    for item in sequence:
        if item > pivot:
            items_greater.append(item)

        else:
            items_lower.append(item)
    return quick_sort(items_lower) + [pivot] + quick_sort(items_greater)

print(quick_sort([1,4,5,6,6,4,3,2,1,3,4,5]))

#algoritmo del bubble sort

# def bubble(list_a):
#     indexing_length = len(list_a)-1
#     sorted = False

#     while not sorted:
#         sorted = True
#         for i in range(0, indexing_length):
#             if list_a[i] > list_a[i+1]:
#                 sorted = False
#                 list_a[i],list_a[i+1] = list_a[i+1], list_a [i]
#     return list_a

# print(bubble([4,7,7,4,3,4,5,6,7,8,2,]))


