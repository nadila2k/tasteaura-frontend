export default function CategoryList({ category, onSelect, selectedCategory }) {
  const isSelected = selectedCategory === category.name;

  return (
    <button
      className={`flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105 ${
        isSelected ? "border-b border-amber-400" : ""
      } w-32`}
      onClick={() => onSelect(category.name)}
    >
      <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <p className="mt-3 text-amber-100 font-medium text-center">
        {category.name}
      </p>
    </button>
  );
}
