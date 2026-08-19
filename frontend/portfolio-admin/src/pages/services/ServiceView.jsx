import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Star, DollarSign, Check, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

import PageHeader from '../../components/ui/PageHeader';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { ConfirmModal } from '../../components/ui/Modal';
import ServiceFormModal from '../../components/services/ServiceFormModal';

import { getService, deleteService } from '../../api/servicesApi';
import { cn } from '../../lib/utils';

export default function ServiceView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getService(id);
        setService(data);
      } catch {
        toast.error('Service not found');
        navigate('/services');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteService(id);
      toast.success('Service deleted');
      navigate('/services');
    } catch {
      toast.error('Failed to delete service');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
        <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (!service) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        title={service.title}
        subtitle="Single service view"
        actions={
          <>
            <Link to="/services">
              <Button variant="outline" size="sm" icon={ArrowLeft}>
                Back
              </Button>
            </Link>
            <Button size="sm" icon={Edit} onClick={() => setEditOpen(true)}>
              Edit
            </Button>
            <Button size="sm" variant="danger" icon={Trash2} onClick={() => setDeleting(true)}>
              Delete
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Service hero */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'relative rounded-xl overflow-hidden p-8 text-white bg-gradient-to-br',
              service.color || 'from-indigo-500 to-purple-500'
            )}
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <i className={cn(service.icon, 'text-3xl')} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{service.title}</h2>
                <p className="text-white/80 mt-1 max-w-lg">{service.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              {service.featured && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-medium">
                  <Star className="w-3 h-3 fill-current" /> Featured
                </span>
              )}
              <Badge variant={service.published ? 'success' : 'default'} size="sm" dot>
                {service.published ? 'Live' : 'Draft'}
              </Badge>
            </div>
          </motion.div>

          {/* Description */}
          <Card>
            <CardBody>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Description
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </CardBody>
          </Card>

          {/* Features */}
          {service.features?.length > 0 && (
            <Card>
              <CardBody>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                    >
                      <Check className="w-4 h-4 text-green-500 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing */}
          <Card>
            <CardBody className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Pricing
              </h3>
              {service.priceFrom != null ? (
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-center">
                  <DollarSign className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                  <p className="text-2xl font-bold">
                    ${Number(service.priceFrom).toLocaleString()}
                    {service.priceTo != null && (
                      <span className="text-sm font-normal text-gray-500">
                        {' '}&ndash; ${Number(service.priceTo).toLocaleString()}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Price range</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No pricing set</p>
              )}
            </CardBody>
          </Card>

          {/* Details */}
          <Card>
            <CardBody className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <Badge variant={service.published ? 'success' : 'default'} dot size="sm">
                    {service.published ? 'Live' : 'Draft'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Featured</span>
                  <span className="font-medium">{service.featured ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Features</span>
                  <span className="font-medium">{service.features?.length || 0} items</span>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Actions */}
          <Card>
            <CardBody className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Actions
              </h3>
              <Button
                variant="outline"
                fullWidth
                size="sm"
                icon={Edit}
                className="justify-start"
                onClick={() => setEditOpen(true)}
              >
                Edit Service
              </Button>
              <Button
                variant="outline"
                fullWidth
                size="sm"
                icon={ExternalLink}
                className="justify-start"
                onClick={() => window.open('/', '_blank')}
              >
                View Live
              </Button>
              <Button
                variant="outline"
                fullWidth
                size="sm"
                icon={Trash2}
                className="justify-start !text-red-500 hover:!bg-red-50 dark:hover:!bg-red-500/10"
                onClick={() => setDeleting(true)}
              >
                Delete Service
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>

      <ServiceFormModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        service={service}
        onSuccess={() => {
          getService(id).then(setService);
          setEditOpen(false);
        }}
      />

      <ConfirmModal
        isOpen={!!deleting}
        onClose={() => setDeleting(false)}
        onConfirm={handleDelete}
        title={`Delete "${service.title}"?`}
        description="This will permanently remove this service from your portfolio."
        confirmText="Delete Service"
        variant="danger"
        loading={deleting}
      />
    </div>
  );
}
