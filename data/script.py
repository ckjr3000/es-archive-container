import csv
import os

output_dir = "output"
os.makedirs(output_dir, exist_ok=True)

def format_value(value):
    if value is None or value.lower() in ['none', 'null']:
        return "null"
    try:
        int_value = int(value)
        return int_value
    except ValueError:
        pass
    return f'"{value}"'

def format_boolean(value):
    return 'true' if value == '1' else 'false'

def format_work_year(value):
    return f'"{value}"'

with open('all_performances.csv', newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    
    for i, row in enumerate(reader):
        md_filename = os.path.join(output_dir, f'{row["performance_id"]}.md')
        with open(md_filename, 'w', encoding='utf-8') as mdfile:
            mdfile.write("---\n")
            mdfile.write(f'performance: {format_value(row["performance"])}\n')
            mdfile.write(f'isPremiere: {format_value(row["isPremiere"])}\n')
            mdfile.write(f'concert: {format_value(row["concert"])}\n')
            mdfile.write(f'work: {format_value(row["work"])}\n')
            mdfile.write(f'isCommission: {format_boolean(row["isCommission"])}\n')
            mdfile.write(f'isResidency: {format_boolean(row["isResidency"])}\n')
            mdfile.write(f'work_year: {format_work_year(row["work_year"])}\n')
            mdfile.write(f'ensemble: {format_value(row["ensemble"])}\n')
            mdfile.write(f'season: {format_value(row["season"])}\n')
            mdfile.write(f'venue: {format_value(row["venue"])}\n')
            mdfile.write(f'person: {format_value(row["person"])}\n')
            mdfile.write(f'country: {format_value(row["country"])}\n')
            mdfile.write("---\n\n")

print("Markdown files created successfully.")
