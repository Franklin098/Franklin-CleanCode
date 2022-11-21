# Solution after renaming

class Point:
    # coordX and coordY names were some redundant (we are in a point class)
    def __init__(self, x, y):
        self.x = x
        self.y = y


class Rectangle:
    # with and height are better names than broad and high
    def __init__(self, starting_point, width, height):
        self.starting_point = starting_point
        self.width = width
        self.height = height

    # get_area is better for a method than than just 'area' which sounds like a property name
    def get_area(self):
        return self.width * self.height

    def print_corners(self):
        top_right = self.starting_point.x + self.width
        bottom_left = self.starting_point.y + self.height
        print('Starting Point (X)): ' + str(self.starting_point.x))
        print('Starting Point (Y)): ' + str(self.starting_point.y))
        print('End Point X-Axis (Top Right): ' + str(top_right))
        print('End Point Y-Axis (Bottom Left): ' + str(bottom_left))


def build_rectangle():
    main_point = Point(50, 100)
    rect = Rectangle(main_point, 90, 10)

    return rect


my_rect = build_rectangle()

print(my_rect.get_area())
my_rect.print_corners()