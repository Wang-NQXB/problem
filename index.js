/**
 * Given an array of non-negative integers, you are initially positioned at the first index of the array.
 * Each element in the array represents your maximum jump length at that position.
 * Your goal is to reach the last index in the minimum number of jumps.
 *
 * For example:
 * Given array A = [2,3,1,1,4]
 * The minimum number of jumps to reach the last index is 2. (Jump 1 step from index 0 to 1, then 3 steps to the last index.)
 *
 * Note:
 * You can assume that you can always reach the last index.
 *
 * https://leetcode.com/problems/jump-game-ii/description/
 * @param nums
 * @returns {number}
 */
const jump = nums => {
  var i
  var times = 0
  var lastStep = nums.length - 1

  while (lastStep) {
    for (i = 0; i < lastStep; i++) {
      if (nums[i] >= lastStep - i) {
        lastStep = i
        times++
        break
      }
    }
  }

  return times
};

/**
 * There are two sorted arrays nums1 and nums2 of size m and n respectively.
 * Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
 *
 * https://leetcode.com/problems/median-of-two-sorted-arrays/description/
 * @param nums1
 * @param nums2
 * @returns {number}
 */
const findMedianSortedArrays = (nums1, nums2) => {
  let temp = []
  while (nums1.length && nums2.length) {
    temp.push(nums1[0] > nums2[0] ? nums2.shift() : nums1.shift())
  }
  temp = temp.concat(nums1, nums2)

  let len = temp.length
  let index = Math.floor(len / 2)
  return len % 2 ? temp[index] : ((temp[index] + temp[index - 1]) / 2)
};

/**
 * Given an unsorted integer array, find the first missing positive integer.
 *
 * For example:
 * Given [1,2,0] return 3,
 * and [3,4,-1,1] return 2.
 *
 * https://leetcode.com/problems/first-missing-positive/description/
 * @param nums
 * @returns {number}
 */
const firstMissingPositive = nums => {
  nums = nums.filter(num => num > 0)
  if (nums.length === 0) return 1

  nums.sort((a, b) => a - b)
  if (nums[0] > 1) return 1

  var i
  var len = nums.length
  for (i = 0; i < len; i++) {
    if (nums[i + 1] - nums[i] > 1)
      return nums[i] + 1
  }

  return nums[i - 1] + 1
};

/**
 * Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.
 *
 * For example,
 * Given [0,1,0,2,1,0,1,3,2,1,2,1], return 6.
 *
 * https://leetcode.com/problems/trapping-rain-water/description/
 * @param height
 * @returns {number}
 */
const trap = height => {
  var i
  var res = 0
  var len = height.length

  var getOne = (val, index) => {
    var i
    var left = 0
    var right = 0

    for (i = index + 1; i < len; i++) {
      height[i] > right && (right = height[i])
    }

    for (i = index - 1; i >= 0; i--) {
      height[i] > left && (left = height[i])
    }

    return Math.max(0, Math.min(left, right) - val)
  }

  for (i = 0; i < len; i++) {
    res += getOne(height[i], i)
  }

  return res
}

/**
 *Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and put.
 *
 * get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
 * put(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.
 *
 * https://leetcode.com/problems/lru-cache/description/
 */
class LRUCache {
  constructor(capacity) {
    var props = []
    this.data = new Proxy({}, {
      get(target, key, receiver) {
        key = key + ''
        var index = props.indexOf(key)

        if (index === -1) {
          return -1
        }

        if (index > 0) {
          props.splice(index, 1)
          props.unshift(key)
        }

        return Reflect.get(target, key, receiver);
      },
      set(target, key, value, receiver) {
        key = key + ''
        var index = props.indexOf(key)

        if (index > 0) {
          props.splice(index, 1)
          props.unshift(key)
        }

        if (index === -1) {
          props.unshift(key)
          if (props.length > capacity) {
            delete  target[props.pop()]
          }
        }

        return Reflect.set(target, key, value, receiver);
      }
    });
  }

  get(key) {
    return this.data[key]
  }

  put(key, value) {
    this.data[key] = value
  }
}
