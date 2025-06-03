import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import CollectorForm from '../components/CollectorForm';
import { Collector } from '../types';
import { Pencil, Trash2, Plus, Users } from 'lucide-react';

const CollectorsPage: React.FC = () => {
  const { collectors, addCollector, updateCollector, deleteCollector } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [editingCollector, setEditingCollector] = useState<Collector | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  const handleAddClick = () => {
    setIsAdding(true);
    setEditingCollector(null);
  };
  
  const handleEditClick = (collector: Collector) => {
    setEditingCollector(collector);
    setIsAdding(false);
  };
  
  const handleDeleteClick = (id: string) => {
    setShowDeleteConfirm(id);
  };
  
  const handleDeleteConfirm = (id: string) => {
    deleteCollector(id);
    setShowDeleteConfirm(null);
  };
  
  const handleCancelDelete = () => {
    setShowDeleteConfirm(null);
  };
  
  const handleSubmit = (collector: Omit<Collector, 'id'> | Collector) => {
    if ('id' in collector) {
      updateCollector(collector);
      setEditingCollector(null);
    } else {
      addCollector(collector);
      setIsAdding(false);
    }
  };
  
  const handleCancel = () => {
    setIsAdding(false);
    setEditingCollector(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Manage Collectors</h1>
        <p className="text-gray-600">
          Add, edit, or remove milk collectors
        </p>
      </div>
      
      {isAdding || editingCollector ? (
        <CollectorForm 
          collector={editingCollector || undefined} 
          onSubmit={handleSubmit} 
          onCancel={handleCancel} 
        />
      ) : (
        <>
          <div className="mb-6">
            <button
              onClick={handleAddClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Plus size={18} className="mr-1" />
              Add New Collector
            </button>
          </div>
          
          {collectors.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mb-4 flex justify-center">
                <Users size={48} className="text-blue-300" />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">No Collectors Found</h2>
              <p className="text-gray-600 mb-4">
                Click the button above to add your first collector.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {collectors.map((collector) => (
                    <tr key={collector.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{collector.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {collector.phoneNumber || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {showDeleteConfirm === collector.id ? (
                          <div className="flex items-center justify-end space-x-2">
                            <span className="text-red-600 mr-2">Confirm delete?</span>
                            <button
                              onClick={() => handleDeleteConfirm(collector.id)}
                              className="text-red-600 hover:text-red-900 bg-red-100 px-2 py-1 rounded"
                            >
                              Yes
                            </button>
                            <button
                              onClick={handleCancelDelete}
                              className="text-gray-600 hover:text-gray-900 bg-gray-100 px-2 py-1 rounded"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleEditClick(collector)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(collector.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CollectorsPage;