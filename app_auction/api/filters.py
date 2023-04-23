from django_filters import (
    CharFilter,
    FilterSet,
    NumberFilter,
)


class CommentFilterSet(FilterSet):
    product_id = CharFilter(method='filter_by_product_id')
    end_count = NumberFilter(method='filter_by_end_count')
    start_count = NumberFilter(method='filter_by_start_count')

    def filter_by_product_id(self, qs, name, value):
        if value:
            qs = qs.filter(product=value)
        return qs

    def filter_by_end_count(self, qs, name, value):
        if value:
            qs = qs[:value]
        return qs

    def filter_by_start_count(self, qs, name, value):
        if value:
            correct_value = value-1
            qs = qs[correct_value:]
        return qs
